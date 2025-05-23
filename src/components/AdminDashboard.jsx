import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import {
  Users,
  Palette,
  CheckCircle2,
  XCircle,
  Image as ImageIcon,
  DollarSign
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [pendingArtisans, setPendingArtisans] = useState([]);
  const [analytics, setAnalytics] = useState({
    weeklyPosts: 0,
    monthlyPosts: 0,
    yearlyPosts: 0,
    weeklyUsers: 0,
    monthlyUsers: 0,
    yearlyUsers: 0,
    totalUsers: 0,
    weeklyArtisans: 0,
    monthlyArtisans: 0,
    yearlyArtisans: 0,
    weeklySales: 0,
    monthlySales: 0,
    yearlySales: 0,
    totalSales: 0,
    monthlyData: []
  });

  useEffect(() => {
    checkAdminAuth();
    fetchPendingArtisans();
    fetchAnalytics();
  }, []);

  const checkAdminAuth = async () => {
    try {
      // Get the current session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session) {
        navigate('/admin/login');
        return;
      }

      // Check if the user exists in admin_accounts
      const { data: adminAccount, error: adminError } = await supabase
        .from('admin_accounts')
        .select('*')
        .single();

      if (adminError || !adminAccount) {
        navigate('/admin/login');
        return;
      }
    } catch (error) {
      console.error('Error checking admin authentication:', error);
      navigate('/admin/login');
    }
  };

  const fetchPendingArtisans = async () => {
    try {
      const { data: pendingUsers, error } = await supabase
        .from('users_tb')
        .select(`
          u_id,
          u_un,
          u_em,
          artisan_tb (
            ar_id,
            ar_nm,
            ar_bio,
            ar_province
          )
        `)
        .eq('u_rl', 'artisan')
        .is('artisan_tb', null);

      if (error) throw error;
      setPendingArtisans(pendingUsers || []);
    } catch (error) {
      console.error('Error fetching pending artisans:', error);
    }
  };

  const fetchAnalytics = async () => {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const yearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);

    try {
      const filterByDate = (arr, field, afterDate) =>
        arr?.filter(item => {
          const d = new Date(item[field]);
          return d instanceof Date && !isNaN(d) && d > afterDate;
        }).length || 0;
      

      // Get all users first - using a more specific query
      const { data: accountsData, error } = await supabase
        .from('users_tb')
        .select('u_id, u_un, u_em, u_rl, u_ca')
        .order('u_id', { ascending: true });

      if (error) {
        console.error('Users fetch error:', error);
        throw error;
      }

      // Add detailed debugging
      console.log('Raw users data:', accountsData);
      console.log('Number of users fetched:', accountsData?.length || 0);
      console.log('User IDs fetched:', accountsData?.map(user => user.u_id));
      console.log('Full user details:', JSON.stringify(accountsData, null, 2));

      // Check if we have the correct RLS policies
      const { data: authData } = await supabase.auth.getSession();
      console.log('Current auth session:', authData);

      // Get all products
      const { data: productsData, error: productsError } = await supabase
        .from('products_tb')
        .select('*')
        .eq('pr_is_active', true);

      if (productsError) throw productsError;

      // Get all artisans
      const { data: artisansData, error: artisansError } = await supabase
        .from('artisan_tb')
        .select('*');

      if (artisansError) throw artisansError;

      // Get all orders
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders_tb')
        .select('or_ca');

      if (ordersError) throw ordersError;

      console.log('Debug Data:', {
        users: accountsData,
        products: productsData,
        artisans: artisansData,
        orders: ordersData
      });

      // Count all users based on u_id, not filtering by u_rl
      const weeklyUsers = filterByDate(accountsData, 'u_ca', weekAgo);
      const monthlyUsers = filterByDate(accountsData, 'u_ca', monthAgo);
      const yearlyUsers = filterByDate(accountsData, 'u_ca', yearAgo);
      const totalUsers = accountsData.length;

      const weeklyPosts = filterByDate(productsData, 'pr_ca', weekAgo);
      const monthlyPosts = filterByDate(productsData, 'pr_ca', monthAgo);
      const yearlyPosts = filterByDate(productsData, 'pr_ca', yearAgo);

      const weeklyArtisans = filterByDate(artisansData, 'ar_ca', weekAgo);
      const monthlyArtisans = filterByDate(artisansData, 'ar_ca', monthAgo);
      const yearlyArtisans = filterByDate(artisansData, 'ar_ca', yearAgo);

      // Count orders instead of calculating sales value
      const weeklyOrders = filterByDate(ordersData, 'or_ca', weekAgo);
      const monthlyOrders = filterByDate(ordersData, 'or_ca', monthAgo);
      const yearlyOrders = filterByDate(ordersData, 'or_ca', yearAgo);
      const totalOrders = ordersData?.length || 0;

      const last12Months = Array.from({ length: 12 }, (_, i) => {
        const date = new Date();
        date.setMonth(date.getMonth() - (11 - i));
        return date;
      });

      const monthlyData = last12Months.map(date => {
        const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
        const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        
        const monthProducts = productsData?.filter(p => {
          const d = new Date(p.pr_ca);
          return d >= monthStart && d <= monthEnd;
        }).length || 0;

        const monthUsers = accountsData?.filter(u => {
          const d = new Date(u.u_ca);
          return d <= monthEnd;
        }).length || 0;

        const monthArtisans = artisansData?.filter(a => {
          const d = new Date(a.ar_ca);
          return d <= monthEnd;
        }).length || 0;

        const monthOrders = ordersData?.filter(o => {
          const d = new Date(o.or_ca);
          return d >= monthStart && d <= monthEnd;
        }).length || 0;

        return {
          name: date.toLocaleString('default', { month: 'short' }),
          Products: monthProducts,
          Users: monthUsers,
          Artisans: monthArtisans,
          Orders: monthOrders
        };
      });

      console.log('Monthly trend data:', monthlyData);

      setAnalytics({
        weeklyPosts,
        monthlyPosts,
        yearlyPosts,
        weeklyUsers,
        monthlyUsers,
        yearlyUsers,
        totalUsers,
        weeklyArtisans,
        monthlyArtisans,
        yearlyArtisans,
        weeklySales: weeklyOrders,
        monthlySales: monthlyOrders,
        yearlySales: yearlyOrders,
        totalSales: totalOrders,
        monthlyData
      });

    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  const handleApprove = async (userId) => {
    try {
      const { error } = await supabase
        .from('artisan_tb')
        .insert([{ u_id: userId }]);
      if (error) throw error;

      fetchPendingArtisans();
      fetchAnalytics();
    } catch (error) {
      console.error('Error approving artisan:', error);
    }
  };

  const handleReject = async (userId) => {
    try {
      const { error } = await supabase
        .from('users_tb')
        .update({ u_rl: 'user' })
        .eq('u_id', userId);
      if (error) throw error;

      fetchPendingArtisans();
      fetchAnalytics();
    } catch (error) {
      console.error('Error rejecting artisan:', error);
    }
  };

  const handleLogout = () => {
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <img src="/assets/honeycomb.png" alt="Logo" className="h-8 w-8" />
              <span className="ml-2 text-xl font-bold text-amber-500">ARTHIVE ADMIN</span>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="bg-amber-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-amber-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Analytics Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Analytics Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Products Analytics */}
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center mb-2">
                <ImageIcon className="h-6 w-6 text-amber-500 mr-2" />
                <h3 className="text-lg font-semibold">Products</h3>
              </div>
              <p className="text-gray-600">This Week: {analytics.weeklyPosts}</p>
              <p className="text-gray-600">This Month: {analytics.monthlyPosts}</p>
              <p className="text-gray-600">This Year: {analytics.yearlyPosts}</p>
            </div>

            {/* Users Analytics */}
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center mb-2">
                <Users className="h-6 w-6 text-amber-500 mr-2" />
                <h3 className="text-lg font-semibold">Users</h3>
              </div>
              <p className="text-gray-600">This Week: {analytics.weeklyUsers}</p>
              <p className="text-gray-600">This Month: {analytics.monthlyUsers}</p>
              <p className="text-gray-600">This Year: {analytics.yearlyUsers}</p>
            </div>

            {/* Artisans Analytics */}
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center mb-2">
                <Palette className="h-6 w-6 text-amber-500 mr-2" />
                <h3 className="text-lg font-semibold">Artisans</h3>
              </div>
              <p className="text-gray-600">This Week: {analytics.weeklyArtisans}</p>
              <p className="text-gray-600">This Month: {analytics.monthlyArtisans}</p>
              <p className="text-gray-600">This Year: {analytics.yearlyArtisans}</p>
            </div>

            {/* Orders Analytics */}
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center mb-2">
                <DollarSign className="h-6 w-6 text-amber-500 mr-2" />
                <h3 className="text-lg font-semibold">Orders</h3>
              </div>
              <p className="text-gray-600">This Week: {analytics.weeklySales}</p>
              <p className="text-gray-600">This Month: {analytics.monthlySales}</p>
              <p className="text-gray-600">This Year: {analytics.yearlySales}</p>
            </div>
          </div>
        </div>

        {/* Monthly Trends Graph */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Monthly Trends</h2>
          <div className="bg-white p-6 rounded-lg shadow">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={analytics.monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Products" stroke="#ffa000" />
                <Line type="monotone" dataKey="Users" stroke="#2196f3" />
                <Line type="monotone" dataKey="Artisans" stroke="#4caf50" />
                <Line type="monotone" dataKey="Orders" stroke="#9c27b0" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Distribution Graph */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Current Distribution</h2>
          <div className="bg-white p-6 rounded-lg shadow">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={[{
                name: 'Total',
                Products: analytics.yearlyPosts,
                Users: analytics.yearlyUsers,
                Artisans: analytics.yearlyArtisans,
                Orders: analytics.yearlySales
              }]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Products" fill="#ffa000" />
                <Bar dataKey="Users" fill="#2196f3" />
                <Bar dataKey="Artisans" fill="#4caf50" />
                <Bar dataKey="Orders" fill="#9c27b0" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pending Artisan Requests */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Pending Artisan Requests</h2>
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {pendingArtisans.map((artisan) => (
                <li key={artisan.u_id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{artisan.u_un}</h3>
                      <p className="text-sm text-gray-500">{artisan.u_em}</p>
                    </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleApprove(artisan.u_id)}
                        className="flex items-center px-3 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200"
                      >
                        <CheckCircle2 className="h-4 w-4 mr-1" />
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(artisan.u_id)}
                        className="flex items-center px-3 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200"
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Reject
                      </button>
                    </div>
                  </div>
                </li>
              ))}
              {pendingArtisans.length === 0 && (
                <li className="px-6 py-4 text-center text-gray-500">
                  No pending artisan requests
                </li>
              )}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
