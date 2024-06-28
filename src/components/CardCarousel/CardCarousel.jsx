import { useContext, useState, useEffect } from 'react';
import Card from '@components/Card/Card';
import AccountContext from '@context/accountContext';
import '@css/main.css';
import '@css/card.css';
import { CCarousel, CCarouselItem } from '@coreui/react';

export default function CardCarousel() {
  const { accounts, setCurrentCard, currentCard } = useContext(AccountContext);
  const [activeIndex, setActiveIndex] = useState(0);
  const colors = [
    "lightpink",
    "lightblue",
    "lightcoral",
    "lightseagreen",
    "lightgreen",
    "lightgrey",
    "lightgray",
  ];

  useEffect(() => {
    if (accounts.length > 0) {
      setCurrentCard(accounts[0]);
    }
  }, [accounts, setCurrentCard]);

  accounts.forEach((account, index) => {
    account.color = colors[index % colors.length];
  });

  const handleSlid = (active, direction) => {
    console.log("Active Index Changed:", active);
    setActiveIndex(active);
    setCurrentCard(accounts[active]);
    console.log("Current Card:", currentCard);
  };

  return (
    <div>
      <CCarousel
        className="custom-carousel"
        controls
        indicators
        interval={false}
        transition="crossfade"
        activeIndex={activeIndex}
        onSlid={(active, direction) => handleSlid(active, direction)}
      >
        {accounts.map((account, index) => (
          <CCarouselItem key={account.id} className="d-block w-100">
            <Card account={account} />
          </CCarouselItem>
        ))}
      </CCarousel>
    </div>
  );
}
