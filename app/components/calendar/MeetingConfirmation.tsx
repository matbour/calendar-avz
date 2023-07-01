import { Dialog } from '@headlessui/react';
import { type FC } from 'react';

interface MeetingConfirmationProps {}

const MeetingConfirmation: FC<MeetingConfirmationProps> = () => {
  return (
    <Dialog>
      <Dialog.Panel></Dialog.Panel>
    </Dialog>
  );
};

export default MeetingConfirmation;
