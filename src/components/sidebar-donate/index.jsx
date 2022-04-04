import React from 'react';
import './styles.css';
// import image from './images/cards.png';

export default () => {
  return (
    <div className="sidebar-donate">
      <div className="sidebar-donate-intro">
        {/* More features are on the way.  */}
        If you find this site useful, please consider making a donation - any size helps. 
        <br />
        Thank you!
      </div>
      <div className="sidebar-donate-form">
        <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
          <input type="hidden" name="cmd" value="_s-xclick" />
          <input type="hidden" name="hosted_button_id" value="NYZF95GWPTUDN" />
          {/* <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" /> */}
          {/* <input type="image" src={image} border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" /> */}
          <input type="submit" name="submit" value="Donate" title="Donate with PayPal, Visa, MasterCard, Discover, American Express" alt="Donate button" />
          <img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />
        </form>
      </div>
      <div className="sidebar-donate-outro">
        <a href="mailto:brian@tripplanner.cafe">Comments/Questions?</a>
      </div>
    </div>
  );
};
