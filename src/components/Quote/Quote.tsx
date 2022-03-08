import axios from "axios";
import React, { FC, useEffect } from "react";
import { RefreshIcon } from "../";
import "./Quote.scss";

/* interface QuoteProps {
  toggledUI: boolean;
} */

type QuoteType = {
  id: number;
  en: string;
  author: string;
};

export const Quote: FC = () => {
  const [quote, setQuote] = React.useState({} as QuoteType);

  const fetchRandomQuote = async () => {
    try {
      // prettier-ignore
      const res = await axios.get<QuoteType>("https://programming-quotes-api.herokuapp.com/Quotes/random");
      setQuote(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRandomQuote();
  }, []);

  return (
    <div className="quote">
      <div className="quote__inner">
        <p className="quote__text">"{quote.en}"</p>
        <p className="quote__author">{quote.author}</p>
      </div>
      <div className="quote__refresh-icon">
        <RefreshIcon onClick={fetchRandomQuote} />
      </div>
    </div>
  );
};
