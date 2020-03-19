import {
  IImageChangeEvent,
  IImageValue
} from "components/form/input-image/input-image";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";

import "./input-image.scss";

type FileWithPreview = any;

export const DropZoneWrapper: React.FC<Props> = ({
  onChange,
  name,
  content,
  className
}) => {
  const [t] = useTranslation();

  const onDrop = useCallback(
    (files: FileWithPreview[]) => {
      if (files.length === 0) return;
      const croppedFiles: IImageValue[] = [];

      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = e => {
          let src = e.target?.result as string;
          let img = new Image();
          img.src = src;
          img.onload = () => {
            croppedFiles.push({
              image: {
                cropped: file,
                name: file.name,
                type: file.type,
                size: file.size,
                height: img.height,
                width: img.width,
                src
              }
            });
            onChange({
              target: { value: croppedFiles, name }
            });
          };
        };
        reader.readAsDataURL(file);
      });
    },
    [onChange, name]
  );

  const {
    open,
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragReject
  } = useDropzone({
    noClick: true,
    onDrop,
    accept: "image/jpeg, image/png"
  });
  return (
    <div {...getRootProps({ className })}>
      <input {...getInputProps()} />
      {isDragAccept && (
        <div className="input-image__dropzone-helper">
          {t("input-image.drop-files")}
        </div>
      )}
      {isDragReject && (
        <div className="input-image__dropzone-helper">
          {t("Some files will be rejected")}
        </div>
      )}
      {content(open)}
    </div>
  );
};

interface Props {
  className?: string;
  name: string;
  onChange: (event: IImageChangeEvent) => void;
  content: (open: VoidFunction) => JSX.Element;
}