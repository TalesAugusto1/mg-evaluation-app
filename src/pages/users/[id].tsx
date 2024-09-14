import { GetServerSideProps } from 'next';
import UserProfile from '../../components/UserProfile';

interface Props {
  userId: string;
}

const UserPage = ({ userId }: Props) => {
  return (
    <div className="min-h-screen p-4">
      <UserProfile userId={userId} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };
  return {
    props: {
      userId: id,
    },
  };
};

export default UserPage;
