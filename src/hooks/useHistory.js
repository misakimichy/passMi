import { useHistory as useHistoryRouter } from 'react-router-dom';

const useHistory = () => {
  const history = useHistoryRouter();

  return history;
};

export default useHistory;
