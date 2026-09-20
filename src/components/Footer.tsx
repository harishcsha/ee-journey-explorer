import './footer.css';

const AUTHOR = 'Harish C Jingade';
const EMAIL = 'harish.jingade@nttdata.com';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="ft">
      <div className="ft-in">
        <p>
          Built from the reference of <b>EE Digital E-commerce New Starter Pack Slides</b> and the{' '}
          <b>React Playback Document - Omni Shop reference</b>.
        </p>
        <p className="ft-made">
          Website built with{' '}
          <span className="ft-heart" role="img" aria-label="love">
            ♥
          </span>{' '}
          by <b>{AUTHOR}</b>
          <br />
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </p>
        <p className="ft-legal">
          © {year} {AUTHOR}. All rights reserved. This website is an independent project made for educational purposes
          only and is not official EE or BT material. EE, BT, Omni Shop and all related names, logos, slides and
          documents remain the property of their respective owners.
        </p>
      </div>
    </footer>
  );
}
