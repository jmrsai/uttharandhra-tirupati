import React, { useState, useEffect } from 'react';
import supabase from '../utils/supabase';

const Todos: React.FC = () => {
    const [todos, setTodos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTodos = async () => {
            setLoading(true);
            try {
                const { data, error } = await supabase.from('todos').select('*');

                if (error) {
                    console.error('Error fetching todos:', error);
                } else if (data) {
                    // The user's snippet had "data.length > 1", but typically we want all
                    setTodos(data);
                }
            } catch (err) {
                console.error('Unexpected error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchTodos();
    }, []);

    return (
        <div className="max-w-xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-primary font-header mb-8 text-center">Supabase Todos</h1>

            {loading ? (
                <div className="text-center py-10">Loading todos...</div>
            ) : (
                <ul className="space-y-4">
                    {todos.length > 0 ? (
                        todos.map((todo, idx) => (
                            <li key={todo.id || idx} className="bg-white p-4 rounded-xl shadow-md border border-neutral/10">
                                {typeof todo === 'string' ? todo : (todo.title || todo.task || JSON.stringify(todo))}
                            </li>
                        ))
                    ) : (
                        <div className="text-center text-neutral-content">No todos found.</div>
                    )}
                </ul>
            )}
        </div>
    );
};

export default Todos;
