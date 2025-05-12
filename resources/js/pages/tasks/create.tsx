
import { Head, useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { FormEventHandler, useRef } from 'react';
import { toast } from 'sonner';

type CreateTaskForm = {
    title?: string;
    description?: string;
    state?: number;
}

export default function Create() {
    const taskTitle = useRef<HTMLInputElement>(null)
    const taskDescription = useRef<HTMLInputElement>(null)
    const taskState = useRef<HTMLInputElement>(null)

    const { data, setData, errors, post, reset, processing } = useForm<Required<CreateTaskForm>>({
        title: '',
        description: '',
        state: 0,
    })

    const createTask: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('tasks.store'), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Se ha creado correctamente la tarea!')
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
                if (errors.state) {
                    reset('state');
                    taskState.current?.focus();
                }
            }
        })
    }

    return (
        <AppLayout>
            <Head title="Nueva Tarea" />
            <div className="flex items-center justify-center p-4 mt-10">
                <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6 text-center">
                        Crear Nueva Tarea
                    </h2>
                    <form onSubmit={createTask} className='space-y-5'>
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
                                Crear Tarea
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
        
    )
}