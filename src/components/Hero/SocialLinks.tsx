import { FaGithub, FaLinkedin } from "react-icons/fa";

export function SocialLinks() {
  return (
    <div className="Hero__SocialLinks">
      <a
        href="https://github.com/AR0Z"
        target="_blank"
        rel="noopener noreferrer"
        className="Link"
      >
        <FaGithub size={24} />
        <p>visit my GitHub</p>
      </a>
      <a
        href="https://www.linkedin.com/in/germain-duchêne-26215723a/"
        target="_blank"
        rel="noopener noreferrer"
        className="Link"
      >
        <FaLinkedin size={24} />
        <p>visit my LinkedIn</p>
      </a>
    </div>
  );
}
