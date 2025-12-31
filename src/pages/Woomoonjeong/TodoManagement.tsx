import React, { useState } from 'react';
import { Calendar, Clock, Plus, CheckCircle2, Circle, PlayCircle, Filter, Search, CreditCard as Edit3, Trash2, Target } from 'lucide-react';
import { todosData, Todo } from '../../data/woomoonjeong/woomoonjeongData';

const TodoManagement: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const getStatusIcon = (status: Todo['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'in-progress':
        return <PlayCircle className="w-5 h-5 text-blue-500" />;
      default:
        return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: Todo['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getTodayTodos = () => {
    return todosData.filter(todo => 
      todo.start_date <= selectedDate && todo.end_date >= selectedDate
    );
  };

  const getFilteredTodos = () => {
    let filtered = todosData;

    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(todo => todo.status === selectedStatus);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(todo => 
        todo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        todo.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const updateTodoStatus = (todoId: string, newStatus: Todo['status']) => {
    // In real app, this would make an API call
    console.log('Update todo status:', todoId, newStatus);
  };

  const deleteTodo = (todoId: string) => {
    if (confirm('이 할일을 삭제하시겠습니까?')) {
      // In real app, this would make an API call
      console.log('Delete todo:', todoId);
    }
  };

  const editTodo = (todo: Todo) => {
    setEditingTodo(todo);
    setShowAddForm(true);
  };

  const addNewTodo = () => {
    setEditingTodo(null);
    setShowAddForm(true);
  };

  const filteredTodos = getFilteredTodos();
  const todayTodos = getTodayTodos();

  return (
    <div className="p-8 bg-gray-50">
      <div className="mx-auto space-y-6 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">To-do Management</h1>
            <p className="text-gray-600">Manage your learning tasks and track progress</p>
          </div>
          <button
            onClick={addNewTodo}
            className="px-4 py-2 bg-[#587CF0] text-white rounded-lg font-medium hover:bg-[#4a6de8] transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Todo
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* Main Content */}
          <div className="space-y-6 lg:col-span-3">
            {/* Filters */}
            <div className="p-6 bg-white border border-purple-100 shadow-sm rounded-xl">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Status:</span>
                  {(['all', 'pending', 'in-progress', 'completed'] as const).map(status => (
                    <button
                      key={status}
                      onClick={() => setSelectedStatus(status)}
                      className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                        selectedStatus === status
                          ? 'bg-[#587CF0] text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {status.replace('-', ' ')}
                    </button>
                  ))}
                </div>
                
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search todos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="px-3 py-1 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#587CF0] focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Todos List */}
            <div className="p-6 bg-white border border-purple-100 shadow-sm rounded-xl">
              <h2 className="mb-6 text-lg font-semibold text-gray-800">All Todos</h2>
              
              <div className="space-y-4">
                {filteredTodos.map(todo => (
                  <div key={todo.id} className="flex items-start gap-4 p-4 transition-colors rounded-lg bg-gray-50 hover:bg-gray-100">
                    <button
                      onClick={() => updateTodoStatus(todo.id, todo.status === 'completed' ? 'pending' : 'completed')}
                      className="mt-1"
                    >
                      {getStatusIcon(todo.status)}
                    </button>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className={`font-medium text-gray-800 mb-1 ${todo.status === 'completed' ? 'line-through text-gray-500' : ''}`}>
                            {todo.name}
                          </h3>
                          <p className={`text-sm text-gray-600 mb-2 ${todo.status === 'completed' ? 'line-through text-gray-400' : ''}`}>
                            {todo.description}
                          </p>
                          
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>{todo.start_date} - {todo.end_date}</span>
                            </div>
                            <span className={`px-2 py-1 rounded-full border text-xs ${getStatusColor(todo.status)}`}>
                              {todo.status.replace('-', ' ')}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-1 ml-4">
                          <button
                            onClick={() => editTodo(todo)}
                            className="p-2 text-gray-400 transition-colors hover:text-blue-500"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteTodo(todo.id)}
                            className="p-2 text-gray-400 transition-colors hover:text-red-500"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredTodos.length === 0 && (
                <div className="py-12 text-center">
                  <Target className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="mb-2 text-lg font-medium text-gray-800">No todos found</h3>
                  <p className="text-gray-600">Try adjusting your filters or create a new todo</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Today's Todos */}
            <div className="p-6 bg-white border border-purple-100 shadow-sm rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="flex items-center gap-2 font-semibold text-gray-800">
                  <Clock className="h-4 w-4 text-[#587CF0]" />
                  Today's Todos
                </h3>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-2 py-1 text-sm border border-gray-200 rounded"
                />
              </div>
              
              <div className="space-y-3">
                {todayTodos.map(todo => (
                  <div key={todo.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                    {getStatusIcon(todo.status)}
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-800">{todo.name}</h4>
                      <p className="mt-1 text-xs text-gray-600">{todo.description}</p>
                      <span className={`inline-block px-2 py-1 text-xs rounded mt-2 ${getStatusColor(todo.status)}`}>
                        {todo.status.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                ))}
                
                {todayTodos.length === 0 && (
                  <p className="py-4 text-sm text-center text-gray-500">No todos for selected date</p>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="p-6 bg-white border border-purple-100 shadow-sm rounded-xl">
              <h3 className="mb-4 font-semibold text-gray-800">Progress Overview</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Todos</span>
                  <span className="font-medium text-gray-800">{todosData.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Completed</span>
                  <span className="font-medium text-gray-800">
                    {todosData.filter(t => t.status === 'completed').length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">In Progress</span>
                  <span className="font-medium text-gray-800">
                    {todosData.filter(t => t.status === 'in-progress').length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Pending</span>
                  <span className="font-medium text-gray-800">
                    {todosData.filter(t => t.status === 'pending').length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoManagement;