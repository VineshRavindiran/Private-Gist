import './style.css';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Listing cards
const Card = ({
  title,
  text,
  target,
  linkTitle,
  href,
  rel,
  onClick,
  linkClassName,
}) => (
  <div className="card">
    <div className="card__title">{title}</div>
    <div className="card__text">{text}</div>
    <a
      className={classNames('default-link', 'card__link', linkClassName)}
      target={target}
      rel={rel}
      href={href}
      onClick={onClick}
    >
      {linkTitle}
    </a>
  </div>
);
//Main function to export page
function Page() {
  const [cards, setCards] = useState([]);

  //Declaring types for the cards using propTypes

  Card.PropTypes = {
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    target: PropTypes.string,
    linkTitle: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    rel: PropTypes.string,
    onClick: PropTypes.func,
    linkClassName: PropTypes.string,
  };
  // Mapping Data
  const mapData = (data) => {
    return data.map((item) => ({
      id: item.id,
      title: item.title,
      linkTitle: item.link_title,
      href: item.link,
      text: item.body.en.substr(0, 50) + '...',
    }));
  };
  // Fetch data from backend API
  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://my-json-server.typicode.com/savayer/demo/posts'
      );
      const data = await response.json();
      const newData = mapData(data);
      setCards(newData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  //Using useEffect to render
  useEffect(() => {
    fetchData();
  }, []);

  const analyticsTrackClick = (url) => {
    console.log(url);
  };

  return (
    <div>
      {cards.map((item) => (
        <Card
          key={item.id}
          title={item.title}
          linkTitle={item.linkTitle}
          href={item.href}
          text={item.text}
          linkClassName={item.id === 1 ? 'card__link--red' : ''}
          target={item.id === 1 ? '_blank' : ''}
          onClick={() => analyticsTrackClick(item.href)}
        />
      ))}
    </div>
  );
}

export default Page;
