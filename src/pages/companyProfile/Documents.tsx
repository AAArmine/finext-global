import Title from '../../components/Title';
import 'react-tabs/style/react-tabs.css';
import DownloadDocItem from './DownloadDocItem';
import { companyDocList } from './constants';

const Documents: React.FC = () => {
  return (
    <>
      <Title text="Required Documents" color="green" />
      <div className="flex flex-wrap pt-3">
        {companyDocList.map((doc) => (
          <DownloadDocItem title={doc.title} key={doc.key} />
        ))}
      </div>
    </>
  );
};

export default Documents;
