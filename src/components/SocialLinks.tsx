import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa"; // Github, LinkedIn, Email

export function SocialLinks() {
  return (
    <div class="social-content" style={{ display: "flex", gap: "1rem" }}>
      <a
        href="https://github.com/AR0Z"
        target="_blank"
        rel="noopener noreferrer"
        class="social-link"
      >
        <FaGithub size={24} />
        <p>GitHub</p>
      </a>

      <a
        href="https://www.linkedin.com/in/germain-duchêne-26215723a/"
        target="_blank"
        rel="noopener noreferrer"
        class="social-link"
      >
        <FaLinkedin size={24} />
        <p>LinkedIn</p>
      </a>

      <a
        href="mailto:germain@duchene.dev    "
        target="_blank"
        rel="noopener noreferrer"
        class="social-link"
      >
        <FaEnvelope size={24} />
        <p>germain@duchene.dev</p>
      </a>
    </div>
  );
}
