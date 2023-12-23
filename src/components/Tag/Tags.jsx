import PropTypes from 'prop-types';

const Tag = ({ text, className }) => (
  <span className={`inline-block rounded-lg ${className || 'bg-black text-white'} px-3 py-1 text-xs font-medium `}>
    {text}
  </span>
);

Tag.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export const UpcomingTags = () => <Tag text="Upcoming" />;
export const OngoingTags = () => <Tag text="Ongoing" />;
export const CompletedTags = () => <Tag text="Completed" />;
export const LastMinutePreparationTags = () => <Tag text="Last-Minute Preparation" />;
export const PostExamReflectionPreTags = () => <Tag text="Post-Exam Reflection" />;
export const SectionTags = ({ children, className }) => <Tag text={children} className={className} />;

SectionTags.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
