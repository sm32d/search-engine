import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactPlayer from "react-player";

import { useResultContext } from "../context/ResultContextProvider";
import { Loading } from "./Loading";

export const Results = () => {
  const {
    results: { results, image_results, entries: news },
    loading,
    getResults,
    searchTerm,
  } = useResultContext();
  const location = useLocation(); // to get the url route like /images, /videos etc.

  useEffect(() => {
    if (searchTerm) {
      if (location.pathname === "/videos") {
        getResults(`/search/q=${searchTerm} videos`);
      } else {
        getResults(`${location.pathname}/q=${searchTerm}&num=100`);
      }
    }
  }, [searchTerm, location.pathname]);

  if (loading) return <Loading />;

  switch (location.pathname) {
    case "/search":
      return (
        <div className="flex flex-col justify-between space-y-6 sm:px-24 min-h-1/2">
          {results?.map(({ link, title, description }, i) => (
            <div key={i} className=" w-full">
              <a href={link} rel="noreferrer">
                <p className="text-sm">
                  {link.length > 30 ? link.substring(0, 30) + "..." : link}
                </p>
                <p className="text-lg hover:underline dark:text-blue-300 text-blue-700">
                  {title}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {description}
                </p>
              </a>
            </div>
          ))}
        </div>
      );
      break;

    case "/image":
      return (
        <div className="flex flex-wrap justify-center items-center">
          {image_results?.map(({ image, link: { href, title } }, i) => (
            <a className="sm:p-3 p-5" href={href} key={i} rel="noreferrer">
              <img src={image?.src} alt={title} loading="lazy" width={300} />
              <p className="w-36 break-words text-sm mt-2">{title}</p>
            </a>
          ))}
        </div>
      );
      break;

    case "/news":
      return (
        <div className="flex flex-col justify-between space-y-6 sm:px-24 items-center">
          {news?.map(({ link, id, source, title }) => (
            <div key={id} className="w-full">
              <a href={link} rel="noreferrer" className="hover:underline">
                <p className="text-lg dark:text-blue-300 text-blue-700">
                  {title}
                </p>
                <div className="flex gap-4">
                  <a href={source?.href} rel="noreferrer">
                    {source?.href}
                  </a>
                </div>
              </a>
            </div>
          ))}
        </div>
      );
      break;

    case "/videos":
      return (
        <div className="flex flex-wrap">
          {results?.map((video, i) => (
            <div key={i} className="p-2">
              {video?.additional_links?.[0]?.href && (
                <ReactPlayer
                  url={video.additional_links?.[0].href}
                  controls
                  width="335px"
                  height="200px"
                />
              )}
            </div>
          ))}
        </div>
      );
      break;

    default:
      return "ERROR!";
      break;
  }
};
