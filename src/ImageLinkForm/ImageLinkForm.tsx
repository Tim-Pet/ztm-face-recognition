import React, { ChangeEvent, FormEvent, ReactElement } from 'react';

type Props = {
  inputValue: string;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onButtonSubmit: (event: FormEvent) => void;
};

const ImageLinkForm = ({
  onInputChange,
  inputValue,
  onButtonSubmit
}: Props): ReactElement => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-0">
      <p className="font-thin text-slate-900">
        This magic brain will detect faces in your pictures. Give it a try!
      </p>
      <div className=" flex w-full  max-w-xs flex-row items-center justify-center gap-4 rounded  py-4 px-8">
        <input
          type="text"
          className=" w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
          onChange={onInputChange}
          value={inputValue}
        />
        <button
          type="button"
          className=" rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
          onClick={onButtonSubmit}
        >
          Detect
        </button>
      </div>
    </div>
  );
};

export default ImageLinkForm;
