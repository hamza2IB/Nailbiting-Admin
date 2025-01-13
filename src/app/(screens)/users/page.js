"use client";
import { useState, useEffect } from "react";
import NewsHeader from "@/components/news/NewsHeader";
import UserTable from "@/components/users/usersTable";
import { Search } from "lucide-react";
import DeleteModal from "@/components/shared/DeleteModal";
import { getAllUsers, deleteUser, searchUsers } from "@/actions/user/user";
import UsersShimmer from "@/components/shimmer/usersShimmer";

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [Users, setUsers] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userID, setUserID] = useState("");
  const [pagesBackend, setPagesBackend] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await fetchUsers(currentPage);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [currentPage]);

  const fetchUsers = async (page = 1) => {
    const response = await getAllUsers(page);
    setUsers(response?.users);
    setFilteredUsers(response?.users);
    setPagesBackend(response?.totalPages);
    setTotalPages(response?.totalPages);
  };

  const handleSearch = async (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    setCurrentPage(1);

    // Fetch filtered users from the API
    const response = await searchUsers(query, 1);
    setFilteredUsers(response?.users);
    setPagesBackend(response?.totalPages);
    setTotalPages(response?.totalPages);
  };

  const handleDelete = (id) => {
    setUserID(id);
    setIsDeleteModalOpen(true);
  };
  const handleConfirmDelete = async () => {
    try {
      await deleteUser(userID);
      await fetchUsers();

      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Failed to delete news:", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (searchQuery) {
      searchUsers(searchQuery, page).then((response) => {
        setFilteredUsers(response?.users);
        setPagesBackend(response?.totalPages);
        setTotalPages(response?.totalPages);
      });
    } else {
      fetchUsers(page);
    }
  };

  return (
    <div className="mx-auto">
      <div className="flex flex-wrap bg-white p-4 sm:p-6 lg:p-8 items-start justify-between">
        <NewsHeader
          title="ユーザー管理"
          description="このページからユーザー情報の確認などができます"
        />
      </div>
{/*      
      {isLoading ? (
        <div className="flex justify-end w-full p-4  sm:p-6 lg:p-8">
          <div className="animate-pulse  bg-gray-200 h-12 w-full max-w-[367px] rounded-xl"></div>
        </div>
      ) : (
        Users.length > 0 && ( */}
          <div className="flex justify-end w-full p-4 pt-8 sm:p-6 lg:p-8">
            <div className="flex items-center border p-3 rounded-xl w-full max-w-[367px] bg-white">
              <Search className="h-5 w-5 text-gray-500 mr-2" />
              <input
                className="border-none outline-none w-full"
                placeholder="検索する"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          </div>
          {/* )
        )} */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden">
          {isLoading ? (
            <UsersShimmer />
          ) : (
            <UserTable users={filteredUsers} onDelete={handleDelete} />
          )}
          {filteredUsers?.length == 0 && !isLoading ? (
            <div className="text-center text-gray-500 mt-4">
              ユーザーが見つかりません。{" "}
            </div>
          ) : (
            <div className="flex items-start sm:items-center space-x-2 justify-center w-full pb-3 max-h-[100px] overflow-auto sm:justify-end mt-4 ">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                className={`px-3 py-1 rounded-md ${
                  currentPage === 1
                    ? "text-gray-400 bg-gray-200 cursor-not-allowed"
                    : "text-gray-600 bg-white hover:bg-[#199A8E] hover:text-white"
                }`}
                disabled={currentPage === 1}
              >
                前へ
              </button>
              {totalPages <= 4 ? (
                Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-3 py-1 ${
                      currentPage === index + 1 ||
                      (index === 0 && currentPage === 1)
                        ? "text-white bg-[#199A8E] hover:bg-[#199A8E]"
                        : "text-gray-600 bg-white hover:bg-[#199a8d7f] hover:text-white"
                    } border rounded-md `}
                  >
                    {index + 1}
                  </button>
                ))
              ) : (
                <>
                  {currentPage >= 0 && (
                    <button
                      onClick={() => handlePageChange(1)}
                      className={`px-3 py-1 ${
                        currentPage === 1
                          ? "text-white bg-[#199A8E] hover:bg-[#199A8E]"
                          : "text-gray-600 bg-white hover:bg-[#199a8d7f] hover:text-white"
                      } border rounded-md `}
                    >
                      1
                    </button>
                  )}
                  {currentPage > 3 && <span className="px-2">...</span>}
                  {Array.from(
                    { length: 3 },
                    (_, index) => currentPage - 1 + index
                  ).map((page) =>
                    page > 1 && page < totalPages ? (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-1 ${
                          currentPage === page
                            ? "text-white bg-[#199A8E] hover:bg-[#199A8E]"
                            : "text-gray-600 bg-white hover:bg-[#199a8d7f] hover:text-white"
                        } border rounded-md `}
                      >
                        {page}
                      </button>
                    ) : null
                  )}
                  {currentPage < totalPages - 1 && (
                    <span className="px-2">...</span>
                  )}
                  {currentPage <= totalPages && (
                    <button
                      onClick={() => handlePageChange(totalPages)}
                      className={`px-3 py-1 ${
                        currentPage === totalPages
                          ? "text-white bg-[#199A8E] hover:bg-[#199A8E]"
                          : "text-gray-600 bg-white hover:bg-[#199a8d7f] hover:text-white"
                      } border rounded-md `}
                    >
                      {totalPages}
                    </button>
                  )}
                </>
              )}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className={`px-3 py-1 rounded-md ${
                  currentPage === totalPages
                    ? "text-gray-400 bg-gray-200 cursor-not-allowed "
                    : "text-gray-600 bg-white hover:bg-[#199A8E] cursor-pointer hover:text-white"
                }`}
                disabled={currentPage === totalPages}
              >
                次
              </button>
            </div>
          )}
        </div>
      </div>
      {isDeleteModalOpen && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
          title="ユーザーの削除"
          message={`実行してよろしいですか？このアクションは取り消すことができません。`}
        />
      )}
    </div>
  );
}
