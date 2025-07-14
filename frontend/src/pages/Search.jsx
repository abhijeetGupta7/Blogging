import { Button, Select, TextInput, Spinner } from 'flowbite-react';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard';

export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: '',
    sort: 'desc',
    category: 'uncategorized',
  });

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const fetchPosts = async (params) => {
    setLoading(true);
    const res = await fetch(`/api/post/getposts?${params}`);
    if (!res.ok) {
      setLoading(false);
      return;
    }
    const data = await res.json();
    setPosts(data.posts);
    setLoading(false);
    setShowMore(data.posts.length ===9);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm') || '';
    const sortFromUrl = urlParams.get('sort') || 'desc';
    const categoryFromUrl = urlParams.get('category') || 'uncategorized';

    setSidebarData((prev) => ({
      ...prev,
      searchTerm: searchTermFromUrl,
      sort: sortFromUrl,
      category: categoryFromUrl,
    }));

    fetchPosts(urlParams.toString());
  }, [location.search]);

  const handleChange = useCallback((e) => {
    const { id, value } = e.target;
    setSidebarData((prev) => ({ ...prev, [id]: value }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (sidebarData.searchTerm) params.set('searchTerm', sidebarData.searchTerm);
    if (sidebarData.sort) params.set('sort', sidebarData.sort);
    if (sidebarData.category) params.set('category', sidebarData.category);

    navigate(`/search?${params.toString()}`);
  };

  const handleShowMore = async () => {
    const startIndex = posts.length;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/post/getposts?${searchQuery}`);
    if (!res.ok) return;

    const data = await res.json();
    setPosts((prev) => [...prev, ...data.posts]);
    setShowMore(data.posts.length === 9);
  };

  const categories = ['uncategorized', 'react', 'nextjs', 'lifestyle', 'ai', 'javascript'];

  return (
    <div className='flex flex-col md:flex-row'>
      {/* Sidebar */}
      <div className='p-7 border-b md:border-r md:min-h-screen border-gray-500'>
        <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
          <div className='flex items-center gap-2'>
            <label className='whitespace-nowrap font-semibold'>Search Term:</label>
            <TextInput
              placeholder='Search...'
              id='searchTerm'
              type='text'
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Sort:</label>
            <Select className='w-20' id='sort' value={sidebarData.sort} onChange={handleChange}>
              <option value='desc'>Latest</option>
              <option value='asc'>Oldest</option>
            </Select>
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Category:</label>
            <Select className='w-35' id='category' value={sidebarData.category} onChange={handleChange}>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </Select>
          </div>
          <Button type='submit' outline>
            Apply Filters
          </Button>
        </form>
      </div>

      {/* Posts */}
      <div className='w-full'>
        <h1 className='text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5'>
          Posts results:
        </h1>
        <div className='p-7 flex flex-wrap gap-4'>
          {!loading && posts.length === 0 && (
            <p className='text-xl text-gray-500'>No posts found.</p>
          )}

          {loading && (
            <div className='flex justify-center items-center w-full py-10'>
              <Spinner size='xl' color='info' aria-label='Loading posts' />
            </div>
          )}

          {!loading &&
            posts.map((post) => <PostCard key={post._id} post={post} />)}

          {showMore && !loading && (
            <button
              onClick={handleShowMore}
              className='text-teal-500 text-lg hover:underline p-7 w-full'
            >
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
