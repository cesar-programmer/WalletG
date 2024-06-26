import { useContext } from 'react';
import Card from '@components/Card/Card';
import AccountContext from '@context/accountContext';
import '@css/main.css';
import '@css/card.css';
import { CCarousel, CCarouselItem } from '@coreui/react';

export default function CardCarousel() {
  const { accounts } = useContext(AccountContext);
  const colors = [
    "lightpink",
    "lightblue",
    "lightcoral",
    "lightseagreen",
    "lightgreen",
    "lightgrey",
    "lightgray",
  ]
  accounts.forEach((account, index) => {
    account.color = colors[index % colors.length];
    console.log(account);
  });
  console.log(accounts, 'accounts');

  return (
    <CCarousel className="custom-carousel " controls indicators interval={false} transition={'crossfade'}>
      {accounts.map((account) => (
        console.log(account),
        <CCarouselItem key={account.id} className="d-block w-100">
          <Card account={account} />
        </CCarouselItem>
      ))}
    </CCarousel>
  );
}
