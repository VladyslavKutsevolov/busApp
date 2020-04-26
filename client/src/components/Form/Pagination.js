import React from 'react';
import { Link } from 'react-router-dom';

export default function Pagination({ postPerPage, totalPosts, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <ul className="flex justify-center list-reset rounded w-auto font-sans my-3">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className="block hover:text-white hover:bg-blue text-blue border border-grey-light px-3 py-2"
          >
            <Link to="#" onClick={() => paginate(number)}>
              {number}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
