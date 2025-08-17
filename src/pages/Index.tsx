import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });

  // Sample speed data based on typical testing scenarios
  const speedData = [
    { id: 1, service: 'Google', testType: 'Download', speed: 95.4, unit: 'Mbps', status: 'Excellent', location: 'Moscow', date: '2024-08-17' },
    { id: 2, service: 'Yandex', testType: 'Upload', speed: 42.1, unit: 'Mbps', status: 'Good', location: 'St. Petersburg', date: '2024-08-17' },
    { id: 3, service: 'YouTube', testType: 'Streaming', speed: 1.2, unit: 'Gbps', status: 'Excellent', location: 'Moscow', date: '2024-08-16' },
    { id: 4, service: 'Netflix', testType: 'Streaming', speed: 850, unit: 'Mbps', status: 'Good', location: 'Kazan', date: '2024-08-16' },
    { id: 5, service: 'Spotify', testType: 'Audio', speed: 320, unit: 'Kbps', status: 'Good', location: 'Moscow', date: '2024-08-15' },
    { id: 6, service: 'Instagram', testType: 'Load Time', speed: 2.3, unit: 'sec', status: 'Average', location: 'Novosibirsk', date: '2024-08-15' },
    { id: 7, service: 'VK', testType: 'Download', speed: 78.9, unit: 'Mbps', status: 'Good', location: 'Ekaterinburg', date: '2024-08-14' },
    { id: 8, service: 'Telegram', testType: 'Upload', speed: 156, unit: 'Mbps', status: 'Excellent', location: 'Moscow', date: '2024-08-14' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Excellent': return 'bg-green-500';
      case 'Good': return 'bg-blue-500';
      case 'Average': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const filteredData = speedData.filter(item =>
    item.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.testType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSort = (key: string) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig.key) return 0;
    
    const aVal = a[sortConfig.key as keyof typeof a];
    const bVal = b[sortConfig.key as keyof typeof b];
    
    if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const averageSpeed = speedData.reduce((acc, curr) => acc + curr.speed, 0) / speedData.length;
  const excellentCount = speedData.filter(item => item.status === 'Excellent').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Speed Analytics
            </h1>
            <nav className="hidden md:flex space-x-8">
              <a href="#table" className="text-gray-600 hover:text-blue-600 transition-colors">Таблица</a>
              <a href="#analytics" className="text-gray-600 hover:text-blue-600 transition-colors">Аналитика</a>
              <a href="#settings" className="text-gray-600 hover:text-blue-600 transition-colors">Настройки</a>
              <a href="#help" className="text-gray-600 hover:text-blue-600 transition-colors">Справка</a>
              <a href="#export" className="text-gray-600 hover:text-blue-600 transition-colors">Экспорт</a>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Hero Section */}
        <section className="text-center py-12">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
            Мониторинг скорости
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Анализируйте производительность сервисов в реальном времени с современными инструментами
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <Icon name="Zap" size={48} className="mx-auto mb-4 text-blue-500" />
                <h3 className="text-xl font-semibold mb-2">Средняя скорость</h3>
                <p className="text-3xl font-bold text-blue-600">{averageSpeed.toFixed(1)}</p>
                <p className="text-gray-500">Mbps</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <Icon name="TrendingUp" size={48} className="mx-auto mb-4 text-green-500" />
                <h3 className="text-xl font-semibold mb-2">Отличных результатов</h3>
                <p className="text-3xl font-bold text-green-600">{excellentCount}</p>
                <p className="text-gray-500">из {speedData.length}</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <Icon name="Globe" size={48} className="mx-auto mb-4 text-purple-500" />
                <h3 className="text-xl font-semibold mb-2">Локаций</h3>
                <p className="text-3xl font-bold text-purple-600">5</p>
                <p className="text-gray-500">городов</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Main Content */}
        <Tabs defaultValue="table" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="table" className="flex items-center gap-2">
              <Icon name="Table" size={16} />
              Таблица Speed
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <Icon name="BarChart3" size={16} />
              Аналитика
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Icon name="Settings" size={16} />
              Настройки
            </TabsTrigger>
            <TabsTrigger value="help" className="flex items-center gap-2">
              <Icon name="HelpCircle" size={16} />
              Справка
            </TabsTrigger>
            <TabsTrigger value="export" className="flex items-center gap-2">
              <Icon name="Download" size={16} />
              Экспорт
            </TabsTrigger>
          </TabsList>

          <TabsContent value="table" id="table">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <CardTitle className="text-2xl">Таблица измерений скорости</CardTitle>
                  <div className="flex items-center gap-4">
                    <Input
                      placeholder="Поиск по сервису, типу или локации..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full md:w-80"
                    />
                    <Button variant="outline" size="sm">
                      <Icon name="Filter" size={16} className="mr-2" />
                      Фильтр
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead 
                          className="cursor-pointer hover:bg-gray-100 transition-colors"
                          onClick={() => handleSort('service')}
                        >
                          <div className="flex items-center gap-2">
                            Сервис
                            <Icon name="ArrowUpDown" size={14} />
                          </div>
                        </TableHead>
                        <TableHead 
                          className="cursor-pointer hover:bg-gray-100 transition-colors"
                          onClick={() => handleSort('testType')}
                        >
                          <div className="flex items-center gap-2">
                            Тип теста
                            <Icon name="ArrowUpDown" size={14} />
                          </div>
                        </TableHead>
                        <TableHead 
                          className="cursor-pointer hover:bg-gray-100 transition-colors"
                          onClick={() => handleSort('speed')}
                        >
                          <div className="flex items-center gap-2">
                            Скорость
                            <Icon name="ArrowUpDown" size={14} />
                          </div>
                        </TableHead>
                        <TableHead>Статус</TableHead>
                        <TableHead 
                          className="cursor-pointer hover:bg-gray-100 transition-colors"
                          onClick={() => handleSort('location')}
                        >
                          <div className="flex items-center gap-2">
                            Локация
                            <Icon name="ArrowUpDown" size={14} />
                          </div>
                        </TableHead>
                        <TableHead 
                          className="cursor-pointer hover:bg-gray-100 transition-colors"
                          onClick={() => handleSort('date')}
                        >
                          <div className="flex items-center gap-2">
                            Дата
                            <Icon name="ArrowUpDown" size={14} />
                          </div>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedData.map((item) => (
                        <TableRow key={item.id} className="hover:bg-gray-50 transition-colors">
                          <TableCell className="font-medium">{item.service}</TableCell>
                          <TableCell>{item.testType}</TableCell>
                          <TableCell className="font-mono">
                            <span className="text-lg font-semibold">{item.speed}</span>
                            <span className="text-sm text-gray-500 ml-1">{item.unit}</span>
                          </TableCell>
                          <TableCell>
                            <Badge className={`${getStatusColor(item.status)} text-white`}>
                              {item.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{item.location}</TableCell>
                          <TableCell className="text-gray-500">{item.date}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" id="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Распределение по статусам</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {['Excellent', 'Good', 'Average'].map((status) => {
                      const count = speedData.filter(item => item.status === status).length;
                      const percentage = (count / speedData.length) * 100;
                      return (
                        <div key={status} className="space-y-2">
                          <div className="flex justify-between">
                            <span>{status}</span>
                            <span>{count} ({percentage.toFixed(1)}%)</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${getStatusColor(status)}`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Топ локации</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Array.from(new Set(speedData.map(item => item.location)))
                      .map(location => {
                        const locationData = speedData.filter(item => item.location === location);
                        const avgSpeed = locationData.reduce((acc, curr) => acc + curr.speed, 0) / locationData.length;
                        return (
                          <div key={location} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <Icon name="MapPin" size={16} className="text-gray-500" />
                              <span className="font-medium">{location}</span>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold">{avgSpeed.toFixed(1)} Mbps</div>
                              <div className="text-sm text-gray-500">{locationData.length} тестов</div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" id="settings">
            <Card>
              <CardHeader>
                <CardTitle>Настройки таблицы</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Отображение</h3>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span>Показывать статусы цветом</span>
                      </label>
                      <label className="flex items-center gap-3">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span>Автообновление данных</span>
                      </label>
                      <label className="flex items-center gap-3">
                        <input type="checkbox" className="rounded" />
                        <span>Компактный режим</span>
                      </label>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Уведомления</h3>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span>Уведомления о низкой скорости</span>
                      </label>
                      <label className="flex items-center gap-3">
                        <input type="checkbox" className="rounded" />
                        <span>Еженедельные отчеты</span>
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="help" id="help">
            <Card>
              <CardHeader>
                <CardTitle>Справка по использованию</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="prose max-w-none">
                  <h3 className="text-lg font-semibold mb-4">Как пользоваться таблицей Speed?</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">Сортировка данных</h4>
                      <p className="text-blue-800">Кликните на заголовок любой колонки для сортировки по возрастанию или убыванию</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-900 mb-2">Поиск и фильтрация</h4>
                      <p className="text-green-800">Используйте поле поиска для быстрого нахождения нужных сервисов или локаций</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h4 className="font-semibold text-purple-900 mb-2">Статусы скорости</h4>
                      <p className="text-purple-800">Excellent (зеленый) - отличная скорость, Good (синий) - хорошая, Average (оранжевый) - средняя</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="export" id="export">
            <Card>
              <CardHeader>
                <CardTitle>Экспорт данных</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Button className="h-20 flex-col gap-2" variant="outline">
                    <Icon name="FileText" size={24} />
                    <span>Экспорт в CSV</span>
                  </Button>
                  <Button className="h-20 flex-col gap-2" variant="outline">
                    <Icon name="FileSpreadsheet" size={24} />
                    <span>Экспорт в Excel</span>
                  </Button>
                  <Button className="h-20 flex-col gap-2" variant="outline">
                    <Icon name="FileJson" size={24} />
                    <span>Экспорт в JSON</span>
                  </Button>
                  <Button className="h-20 flex-col gap-2" variant="outline">
                    <Icon name="Printer" size={24} />
                    <span>Печать отчета</span>
                  </Button>
                  <Button className="h-20 flex-col gap-2" variant="outline">
                    <Icon name="Share" size={24} />
                    <span>Поделиться ссылкой</span>
                  </Button>
                  <Button className="h-20 flex-col gap-2" variant="outline">
                    <Icon name="Mail" size={24} />
                    <span>Отправить на email</span>
                  </Button>
                </div>
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Настройки экспорта</h4>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked />
                      <span>Включить заголовки колонок</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked />
                      <span>Экспортировать только отфильтрованные данные</span>
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;