import { memo, useCallback, useState } from 'react';
import { useMutation } from '@apollo/client';
import { withRouter } from 'react-router-dom';

import { CREATE_NOTE } from '../apollo/mutation';
import { GET_MY_NOTES } from '../apollo/query';

const NoteForm = ({ history }) => {
  const [createNote] = useMutation(CREATE_NOTE, {
    refetchQueries: [{ query: GET_MY_NOTES }],
    onCompleted: () => {
      history.push('/notes');
    },
  });

  const [value, setValue] = useState();

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      createNote({
        variables: {
          content: value,
        },
      });
    },
    [createNote, value]
  );

  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  return (
    <div className="max-w-7xl mx-auto h-full">
      <form className="h-full p-4 flex flex-col" onSubmit={onSubmit}>
        <textarea
          className="w-full h-full p-4 resize-none border border-solid border-gray-300 rounded-md focus:outline-none"
          required
          value={value}
          onChange={onChange}
        />

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-800 px-7 py-3 mt-4 rounded-md text-white text-sm hover:bg-blue-900 focus:outline-none"
          >
            CREATE
          </button>
        </div>
      </form>
    </div>
  );
};

export default withRouter(memo(NoteForm));
