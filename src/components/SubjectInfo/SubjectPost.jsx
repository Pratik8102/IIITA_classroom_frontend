import React, { useState } from "react";

const PDF = "/photos/miscellaneous/pdf.png";
const ZIP = "/photos/miscellaneous/zip.png";

function formatDate(dateString) {
  const date = new Date(dateString);
  // Extracting date components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  // Extracting time components
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes} ${day}/${month}/${year}`;
}

function SubjectPost(props) {
  const subPosts = props.sub.posts;
  const temp = subPosts ? [...subPosts].reverse() : [];
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setModalOpen(false);
  };

  return (
    <>
      {temp.length > 0 ? (
        <div className="w-full flex flex-col items-center ">
          {temp.map((post) => (
            <div
              key={post._id}
              className="border border-gray-300 p-2 w-full sm:w-11/12 my-2 rounded-2xl flex flex-col"
            >
              <div className="p-2 flex">
                <img
                  src={post.authorImage}
                  alt="Author"
                  className="w-12 rounded-full mr-4"
                />
                <div className="flex flex-col justify-center">
                  <div className="text-sm font-bold text-gray-600">
                    {post.author}
                  </div>
                  <div className="text-xs text-gray-400">
                    {formatDate(post.date)}
                  </div>
                </div>
              </div>
              <div className="text-sm p-2 text-gray-700 overflow-auto">
                {post.content}
              </div>
              {post.fileUrl && (
                <div className="p-2 flex items-center border border-b w-1/2 border-gray-300 rounded-2xl">
                  <div style={{ width: "30%" }}>
                    {post.fileUrl.endsWith(".png") ||
                    post.fileUrl.endsWith(".jpg") ||
                    post.fileUrl.endsWith(".jpeg") ? (
                      <img
                        src={post.fileUrl}
                        alt="File"
                        style={{
                          width: "100%",
                          cursor: "pointer",
                          borderRadius: "8px",
                        }}
                        onClick={() => openModal(post.fileUrl)}
                      />
                    ) : post.fileUrl.endsWith(".pdf") ? (
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                          src={PDF} // PDF icon
                          alt="PDF"
                          style={{
                            width: "50%",
                            cursor: "pointer",
                            borderRadius: "8px",
                          }}
                          onClick={() => window.open(post.fileUrl, "_blank")}
                        />
                        <span className="text-xs text-gray-400 ml-2">PDF</span>
                      </div>
                    ) : post.fileUrl.endsWith(".zip") ? (
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                          src={ZIP} // ZIP icon
                          alt="ZIP"
                          style={{
                            width: "50%",
                            cursor: "pointer",
                            borderRadius: "8px",
                          }}
                          onClick={() => window.open(post.fileUrl, "_blank")}
                        />
                        <span className="text-xs text-gray-400 ml-2">ZIP</span>
                      </div>
                    ) : (
                      <div>
                        <span className="font-semibold">{post.fileName}</span>{" "}
                        <a href={post.fileUrl} download>
                          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                            Download
                          </button>
                        </a>
                      </div>
                    )}
                  </div>
                  <div style={{ width: "70%", paddingLeft: "10px" }}>
                    <div className="text-sm font-semibold text-gray-700">
                      {post.fileName}
                    </div>
                    <div className="text-xs text-gray-400">
                      {post.fileUrl.endsWith(".png") ||
                      post.fileUrl.endsWith(".jpg") ||
                      post.fileUrl.endsWith(".jpeg")
                        ? "Image"
                        : post.fileUrl.endsWith(".pdf") ||
                          post.fileUrl.endsWith(".zip")
                        ? ""
                        : "Download"}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className=" font-semibold text-gray-400  rounded-lg p-2 m-4 flex flex-col items-center">
          No posts yet
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="relative max-w-4xl w-full h-auto">
            <button
              className="absolute top-0 right-0 m-4 text-white text-2xl"
              onClick={closeModal}
            >
              &times;
            </button>
            <img
              src={selectedImage}
              alt="Modal"
              className="w-70 mx-auto"
              style={{ maxHeight: "70vh" }}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default SubjectPost;
