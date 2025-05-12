import AppLayout from '@/layouts/app-layout';
import { Head, router, Link } from '@inertiajs/react';
import { Button, buttonVariants } from '@/components/ui/button';
import { toast } from 'sonner';
import { Plus, Trash2, ClipboardPenLine, Check, X } from 'lucide-react';
import { type Task } from '@/types';

export default function Index({ tasks }: { tasks: Task[] }) {

    const deleteTask = (id: number) => {
        if (confirm('Esta Seguro ?')) {
            router.delete(route('tasks.destroy', {id}));
            toast.success('La tarea se a eliminado correctamente!');
        }
    }

    const toggleState = (id: number) => {
        // router.patch(route('tasks.updateState', {id}))

        router.patch(
            route('tasks.updateState', { id }),
        {},
        {
            onSuccess: () => {
                toast.success('La tarea se a modificado correctamente!');
            },
            
            onError: () => {
                toast.error('Ha ocurrido un error al modificar la tarea!');
            }
        });
    }

    return (
        <AppLayout>
            <Head title="Lista" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4 mt-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6 text-center">
                    Lista de tareas
                </h2>
                <div className='flex items-center justify-end'>
                    <Link
                        href="/tasks/create"
                        className={[
                            buttonVariants({ variant: 'default', size: 'sm' }),
                            'inline-flex items-center gap-2 w-32',
                            'transform transition-transform duration-150',
                            'hover:scale-105',
                            'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
                        ].join(' ')}
                        aria-label="Agregar nueva tarea"
                        >
                        <Plus className="w-4 h-4" aria-hidden="true" />
                        <span className="whitespace-nowrap">Nueva Tarea</span>
                    </Link>
                </div>
                <table className="w-full min-w-[600px] table-fixed divide-y divide-gray-200 bg-white text-gray-900 dark:divide-gray-700 dark:bg-gray-800 dark:text-white rounded-sm">
                    <thead>
                        <tr>
                        <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Titulo</th>
                        <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium uppercase tracking-wider hidden lg:table-cell">Descripcion</th>
                        <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium uppercase tracking-wider w-30">Estado</th>
                        <th className="px-2 sm:px-4 py-3 text-center text-xs font-medium uppercase tracking-wider w-30 hidden md:table-cell">Fecha Creacion</th>
                        <th className="px-2 sm:px-4 py-3 text-center text-xs font-medium uppercase tracking-wider w-40">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {tasks.map((task) => (
                            <tr key={task.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                <td className="px-2 sm:px-4 py-2 text-pretty">{task.title}</td>
                                <td className="px-2 sm:px-4 py-2 hidden lg:table-cell">
                                    <span className="block text-pretty">
                                        {task.description}
                                    </span>
                                </td>
                                <td className="px-2 sm:px-4 py-2 w-30 text-left">{task.state == 0 ? 'Pendiente' : 'Completado'}</td>
                                <td className="px-2 sm:px-4 py-2 w-30 text-center hidden md:table-cell">{task.formatted_created}</td>
                                <td className="flex px-2 sm:px-4 w-40 py-2 space-x-2 justify-center">
                                    
                                    <Button 
                                        title={task.state == 0 ? 'Completar Tarea' : 'Dejar Pendiente'}
                                        variant={'default'}
                                        className='cursor-pointer'
                                        onClick={() => toggleState(task.id)}
                                    >
                                        {task.state == 0 ? <Check className='w-4 h-4'/> : <X className='w-4 h-4'/>}
                                    </Button>
                                    
                                    <Link 
                                        className={buttonVariants({ variant: 'default'})}
                                        href={`/tasks/${task.id}/edit`}
                                        title='Editar Tarea'
                                    >
                                        <ClipboardPenLine className='w-4 h-4'/>
                                    </Link>
                                    <Button 
                                        title='Eliminar tarea'
                                        variant={'destructive'}
                                        className='cursor-pointer'
                                        onClick={() => deleteTask(task.id)}
                                    >
                                        <Trash2 className='w-4 h-4'/>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AppLayout>
    )
}