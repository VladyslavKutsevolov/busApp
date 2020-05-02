import React, { useState, useEffect } from 'react';
import RouteMap from './Map/Map.js';
import { useData } from '../context/localStateProvider';
import AllPosts from './Form/AllPosts';
import FormModal from './Form/FormModal';
import AutoComplete from './Form/AutoComplete';
import { useHttp } from '../hooks/http.hook';
import Message from './Form/Message';

export default function Page() {
  const [show, setShow] = useState(false);
  const [postData, getPostData] = useState();
  const [allRoutes, setAllRoutes] = useState();
  const { route, setRoute, getSinglePost, message } = useData();
  const { loading, error, request } = useHttp();

  useEffect(() => {
    const fetchAllRoutes = async () => {
      try {
        const data = await request(
          'https://data.calgary.ca/resource/hpnd-riq4',
        );
        setAllRoutes(data);
      } catch (error) {}
    };
    fetchAllRoutes();
  }, [request]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="constainer ">
      <div className="app p-4">
        {(error || message) && <Message error={error} message={message} />}
        <h2>Feedback about whom?</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <AutoComplete handleChange={setRoute} suggestions={allRoutes} />
        )}
        <div>
          {route && allRoutes && (
            <button
              onClick={handleShow}
              className="bg-transparent border border-indigo-500 hover:border-indigo-500 text-gray-500 hover:text-indigo-500 font-bold py-2 px-4 rounded-full"
            >
              Add Comment
            </button>
          )}
        </div>
        <FormModal
          show={show}
          postData={postData}
          getPostData={getPostData}
          handleClose={handleClose}
          handleShow={handleShow}
        />
        {route && (
          <AllPosts
            postData={postData}
            getSinglePost={getSinglePost}
            getPostData={getPostData}
            route={route}
            show={show}
            handleClose={handleClose}
            handleShow={handleShow}
          />
        )}
      </div>
      <div className="app p-4">
        {!show && allRoutes && <RouteMap allRoutes={allRoutes} route={route} />}
      </div>
    </div>
  );
}
