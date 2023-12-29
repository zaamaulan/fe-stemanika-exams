import PropTypes from 'prop-types';

const Tag = ({ text, colorClass }) => (
  <span className={`inline-block rounded-lg ${colorClass} px-3 py-1 text-xs font-medium`}>
    {text}
  </span>
);

Tag.propTypes = {
  text: PropTypes.string.isRequired,
  colorClass: PropTypes.string.isRequired,
};

export const UpcomingTags = () => <Tag text="Upcoming" colorClass="bg-blue-500 text-white xl:py-1 xl:px-3 xl:text-sm" />;
export const OngoingTags = () => <Tag text="Ongoing" colorClass="bg-green-500 text-white xl:py-1 xl:px-3 xl:text-sm" />;
export const CompletedTags = () => <Tag text="Completed" colorClass="bg-gray-500 text-white xl:py-1 xl:px-3 xl:text-sm" />;
export const LastMinutePreparationTags = () => <Tag text="Last-Minute Preparation" colorClass="bg-yellow-500 text-white xl:py-1 xl:px-3 xl:text-sm" />;
export const PostExamReflectionPreTags = () => <Tag text="Post-Exam Reflection" colorClass="bg-purple-500 text-white xl:py-1 xl:px-3 xl:text-sm" />;
export const SectionTags = ({ children, colorClass }) => <Tag text={children} colorClass={colorClass} />;

SectionTags.propTypes = {
  children: PropTypes.node.isRequired,
  colorClass: PropTypes.string.isRequired,
};
