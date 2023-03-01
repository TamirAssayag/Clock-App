import axios from "axios";
import { AnimatePresence, motion, Variants } from "framer-motion";
import React, { FC, useEffect } from "react";
import { RefreshIcon } from "../";
import "./Quote.scss";

type QuoteType = {
  _id: number;
  content: string;
  author: string;
};

const variants: Variants = {
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const Quote: FC = () => {
  const [quote, setQuote] = React.useState({} as QuoteType);

  const fetchRandomQuote = async () => {
    try {
      // prettier-ignore
      const res = await axios.get<QuoteType>("https://api.quotable.io/random");
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
      <AnimatePresence exitBeforeEnter>
        <motion.div
          key={quote._id}
          className="quote__inner"
          role="contentinfo"
          variants={variants}
          animate="animate"
          exit="exit"
          initial="exit"
        >
          {quote.content && (
            <>
              <p className="quote__text">"{quote.content}"</p>
              <p className="quote__author">{quote.author}</p>
            </>
          )}
        </motion.div>
      </AnimatePresence>
      <div className="quote__refresh-icon">
        <RefreshIcon onClick={fetchRandomQuote} />
      </div>
    </div>
  );
};
