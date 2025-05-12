import { Head, useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { FormEventHandler, useRef } from 'react';
import { type Task } from '@/types';

type EditTaskForm = {
    title?: string;
    description?: string;
}


export default function Edit({task}: {task: Task}) {
    const taskTitle = useRef<HTMLInputElement>(null)
    const taskDescription = useRef<HTMLInputElement>(null)

    const { data, setData, errors, put, reset, processing } = useForm<Required<EditTaskForm>>({
        title: task.title,
        description: task.description,
    })

    const editTask: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('tasks.update', task.id), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
            onError: (errors) => {
                if (errors.title) {
                    reset('title');
                    taskTitle.current?.focus();
                }
                if (errors.description) {
                    reset('description');
                    taskDescription.current?.focus();
                }
            }
        })
    }

    return (
        <AppLayout>
            <Head title="Editar Tarea" />
            <div className="flex items-center justify-center p-4 mt-10">
                <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6 text-center">
                        Editar Tarea
                    </h2>
                    <form onSubmit={editTask} className='space-y-5'>
                            <div className="space-y-2">
                            <Label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Título <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="title"
                                ref={taskTitle}
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            />
                            <InputError message={errors.title} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Descripción <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="description"
                                ref={taskDescription}
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            />
                            <InputError message={errors.description} />
                        </div>
                        <div className="pt-4">
                            <Button
                                type="submit"
                                disabled={processing}
                                className="w-full inline-flex justify-center items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-white rounded-md transition"
                            >
                                Guardar Tarea
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
        
    )
}