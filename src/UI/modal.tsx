import React, { ReactElement, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal: React.FC<{ onClose: () => void; children: ReactElement }> = ({
  children,
  onClose,
}) => {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const modal = dialog.current;
    modal!.showModal();
    return () => {
      modal!.close();
    };
  }, []);

  return createPortal(
    <dialog className="modal" ref={dialog} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById("modal")!
  );
};

export default Modal;
