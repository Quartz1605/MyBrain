import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

  

export const UserLinks = () => {

  const [content, setContent] = useState([]);
  const [firstName, setFirstName] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const getLinks = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/content/get-user-links/${id}`);
      if (response.status === 200) {
        setContent(response.data.content);
        setFirstName(response.data.firstName);
      } else {
        alert(response.data.message);
      }
    } catch (e) {
      alert("Some backend error happened " + e);
    }
  };

  useEffect(() => {
    getLinks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      
        <button
          className="px-6 py-2 bg-white text-purple-700 rounded-full font-semibold shadow hover:bg-gray-200 border-gray-200 border-1 transition-all duration-150"
          onClick={() => navigate('/login')}
        >
          Get Started with MyBrain
        </button>
      
      <h1 className="text-3xl font-bold text-purple-700 mb-8 text-center">{firstName}'s Links</h1>
      <div className="grid auto-rows-min gap-6 md:grid-cols-3">
        {Array.isArray(content) && content.length > 0 ? (
          content.map((item) => (
            <div
              key={item._id}
              className="rounded-xl shadow-lg bg-white border border-purple-100 p-5 flex flex-col gap-2 hover:shadow-2xl transition-shadow duration-200"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg font-bold text-purple-700 truncate max-w-[70%]">
                  {item.title}
                </span>
                <span className="ml-auto px-2 py-0.5 rounded-full text-xs bg-purple-100 text-purple-700 uppercase">
                  {item.type}
                </span>
              </div>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline break-all hover:text-blue-800"
              >
                {item.link}
              </a>
              {item.description && (
                <div className="text-black text-sm mt-1 mb-1 line-clamp-3">
                  {item.description}
                </div>
              )}
              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {item.tagName.map((tag, idx) => (
                    <span
                      key={tag + idx}
                      className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center text-gray-400 text-lg py-10">
            No links to display yet.
          </div>
        )}
      </div>
    </div>
  );
};


