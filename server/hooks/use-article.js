import {useState, useEffect} from 'react';
import axios from 'axios';

const useArticles = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try{
        const response = await axios.get("http://localhost:3005/api/articles")
        setArticles(response.data.data);
      }catch(err){
        setError(err);
      } finally {
        setLoading(false);
      }
    };
  }, []);

  return {articles, error, loading};
};

export default useArticles;