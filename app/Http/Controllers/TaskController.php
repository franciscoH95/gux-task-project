<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\Task;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('tasks/index', [
            'tasks' => Task::orderBy('created_at', 'desc')
                        ->get()
                        ->map(function ($task) {
                            $task->formatted_created = $task->created_at
                            ->locale('es')
                            ->isoFormat('DD/MM/YY');
                            return $task;
                        })
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('tasks/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
        ]);

        Task::create([
            'title' => $request->title,
            'description' => $request->description,
            'state' => 0,
            'created_at' => now(),
            'updated_at' => now(),
            'user_id' => Auth::id(),
        ]);

        return redirect()->route('tasks.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        if (! Gate::allows('manage-task', $task)) {
            abort(403, 'La Tarea que intenta editar no le pertenece');
        }

        return Inertia::render('tasks/edit', [
            'task' => $task,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        if (! Gate::allows('manage-task', $task)) {
            abort(403, 'La Tarea que intenta editar no le pertenece');
        }

        $data = $request->validate([
            'title'         => 'required|string|max:255',
            'description'    => 'nullable|string',
        ]);

        $task->update($data);

        return redirect()->route('tasks.index');
    }

    public function updateState(UpdateTaskRequest $request, Task $task)
    {
        if ($task['state'] == 0) {
            $task['state'] = 1;
        } else {
            $task['state'] = 0;
        }

        $task->update([
            'state' => $task['state'],
        ]);

        return redirect()->route('tasks.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $task->delete();

        return redirect()->route('tasks.index');
    }
}
