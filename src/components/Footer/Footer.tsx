import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Logo } from '../Logo';
import './Footer.scss';

export const Footer = () => {
  const { t, i18n } = useTranslation();

  const switchLanguage = () => {
    if (i18n.language === 'en') {
      i18n.changeLanguage('ua');
    } else {
      i18n.changeLanguage('en');
    }
  };

  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__wrapper">
          <div className="footer__logo">
            <Logo />
          </div>

          <button className="button footer__language" onClick={switchLanguage}>
            {i18n.language}
          </button>
        </div>

        <div className="footer__link-wrapper">
          <Link
            to="https://github.com/akozlovska/Nice_Gadgets_store"
            target="_blank"
            rel="noreferrer"
            className="footer__link"
          >
            Github
          </Link>
          <Link to="/contacts" className="footer__link">
            {t('contacts')}
          </Link>
          <Link to="/rights" className="footer__link">
            {t('rights')}
          </Link>
        </div>

        <div className="footer__button-wrapper">
          <p className="footer__button-text">{t('back-to-top')}</p>
          <button
            type="button"
            className="button button--arrow-up"
            aria-label="Back to top"
            onClick={() =>
              document.body.scrollTo({ top: 0, behavior: 'smooth' })
            }
          />
        </div>
      </div>
    </footer>
  );
};
