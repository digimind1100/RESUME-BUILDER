import './TutorialVideo.css';

export default function TutorialVideo() {
  return (
    <section className="tutorial-video-section">
      <h2>Resume Builder Tutorial</h2>
      <p>Watch this video to learn how to create a professional resume step by step.</p>
      <div className="video-container">
        <iframe
          src="/demo/mockup.mp4" type="video/mp4" // dummy video
          title="Resume Builder Tutorial"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
}
