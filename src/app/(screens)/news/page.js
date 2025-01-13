"use client";
import { useState, useEffect } from "react";
import NewsCard from "../../../components/news/NewsCard";
import NewsHeader from "@/components/news/NewsHeader";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getAllNews, deleteNews } from "@/actions/news/news";
import DeleteModal from "@/components/shared/DeleteModal";
import NewsShimmer from "../../../components/shimmer/NewsShimmer";

export default function NotificationsPage() {
  const [newsData, setNewsData] = useState([]);
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [newID, setNewsID] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const news = await getAllNews();
      if (news.data) {
        setNewsData(news.data);
      } else {
        console.error("Unexpected response format:", news.data);
      }
    } catch (error) {
      console.error("Failed to fetch news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleDelete = async (id) => {
    setIsDeleteModalOpen(true);
    try {
      await deleteNews(newID);
      await fetchNews(); // Fetch the list of news again after deletion
    } catch (error) {
      console.error("Failed to delete news:", error);
    }
  };
  const handleEdit = (id) => {
    router.push(`/news/add?id=${id}`);
  };

  return (
    <div className="mx-auto">
      <div className="flex flex-wrap bg-white p-4 sm:p-6 lg:p-8 items-start justify-between">
        <NewsHeader
          title="お知らせ管理" // Pass title prop
          description="このページからお知らせの新規作成や削除などができます" // Pass description prop
        />
        <Link href="/news/add">
          <div className="flex gap-2 justify-between bg-[#199A8E] cursor-pointer rounded-[8px] px-4 py-[10px] hover:bg-[#1d736a] mb-6">
            <Image
              src="/svgs/auth/plus.svg"
              alt="Logo"
              width={20}
              height={20}
            />
            <div className="text-white text-sm transition-colors">新規作成</div>
          </div>
        </Link>
      </div>
      <div className="flex gap-[18px] p-4 pt-8 sm:p-6 lg:p-8 flex-col overflow-y-auto pr-5 h-[calc(100vh - 13px)]">
        {loading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <NewsShimmer key={index} />
          ))
        ) : newsData.length > 0 ? (
          newsData.map((news) => (
            <div key={news._id}>
              <NewsCard
                news={news}
                onDelete={() => {
                  setNewsID(news?._id);
                  setIsDeleteModalOpen(true);
                }}
                onEdit={() => handleEdit(news._id)}
              />
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center w-full">
            <div className="text-gray-500">お知らせがありません。</div>
          </div>
        )}
      </div>
      {isDeleteModalOpen && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={() => {
            handleDelete();
            setIsDeleteModalOpen(false);
          }}
          title="動画の削除"
          message={`実行してよろしいですか？このアクションは取り消すことができません。`}
        />
      )}
    </div>
  );
}
