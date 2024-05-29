import PropTypes from "prop-types";

import { memo, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { Toast } from "primereact/toast";
import { Tooltip } from "primereact/tooltip";
import { FileUpload } from "primereact/fileupload";
import { ProgressBar } from "primereact/progressbar";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

import axios from "axios";

import Cookies from "js-cookie";

import { AdvancedImage } from "@cloudinary/react";
import cld from "../../../../utils/CloudinaryInstance";
import { fill } from "@cloudinary/url-gen/actions/resize";

import EditImageSkeleton from "./EditImageSkeleton";

import { ClipLoader } from "react-spinners";

import DeleteButton from "../../../../components/Button/Button";

import "./EditImage.css";
function EditImage() {
  const { id } = useParams();
  const toast = useRef(null);
  const [totalSize, setTotalSize] = useState(0);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const fileUploadRef = useRef(null);

  useEffect(() => {
    const jwt = Cookies.get("token");
    axios
      .get(`${import.meta.env.VITE_REACT_API_URL}/product/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        const sortedImages = res.data.images.sort(
          (a, b) => b.isPrimary - a.isPrimary
        );
        setImages(sortedImages);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const onTemplateUpload = (e) => {
    let _totalSize = 0;

    e.files.forEach((file) => {
      _totalSize += file.size || 0;
    });

    setTotalSize(_totalSize);
    toast.current.show({
      severity: "info",
      summary: "Success",
      detail: "File Uploaded",
    });
  };

  const onTemplateSelect = (e) => {
    let _totalSize = totalSize;
    let files = e.files;

    Object.keys(files).forEach((key) => {
      _totalSize += files[key].size || 0;
    });

    setTotalSize(_totalSize);
  };

  const onTemplateRemove = (file, callback) => {
    setTotalSize(totalSize - file.size);
    callback();
  };

  const onTemplateClear = () => {
    setTotalSize(0);
  };

  const headerTemplate = (options) => {
    const { className, chooseButton, uploadButton, cancelButton } = options;
    const value = totalSize / 10000;
    const formatedValue =
      fileUploadRef && fileUploadRef.current
        ? fileUploadRef.current.formatSize(totalSize)
        : "0 B";

    return (
      <div
        className={className}
        style={{
          backgroundColor: "transparent",
          display: "flex",
          alignItems: "center",
        }}
      >
        {chooseButton}
        {uploadButton}
        {cancelButton}
        <div className="flex align-items-center gap-3 ml-auto">
          <span className="text-sm">{formatedValue} / 1 MB</span>
          <ProgressBar
            value={value}
            showValue={false}
            style={{ width: "10rem", height: "6px" }}
          ></ProgressBar>
        </div>
      </div>
    );
  };

  const itemTemplate = (file, props) => {
    return (
      <div className="flex align-items-center flex-wrap">
        <div className="flex align-items-center" style={{ width: "40%" }}>
          <img
            alt={file.name}
            role="presentation"
            src={file.objectURL}
            width={50}
          />
          <span className="text-sm flex flex-column text-left ml-3">
            {file.name}
            <small>{new Date().toLocaleDateString()}</small>
          </span>
        </div>
        <Tag
          value={props.formatSize}
          severity="warning"
          className="px-3 py-2"
        />
        <Button
          type="button"
          icon="pi pi-times"
          className="cancel-button p-button-outlined p-button-rounded p-button-danger ml-auto"
          onClick={() => onTemplateRemove(file, props.onRemove)}
        />
      </div>
    );
  };

  const emptyTemplate = () => {
    return (
      <div className="flex align-items-center flex-column">
        <i
          className="pi pi-image mt-3 p-5"
          style={{
            fontSize: "5em",
            borderRadius: "50%",
            backgroundColor: "var(--surface-b)",
            color: "var(--surface-d)",
          }}
        ></i>
        <span
          style={{ fontSize: "1.2em", color: "var(--text-color-secondary)" }}
          className="my-5"
        >
          Drag and Drop Image Here
        </span>
      </div>
    );
  };

  const ImageTemplate = memo(({ image, isPrimary, onDelete, onSave, link }) => {
    const isSelected = selectedImages.includes(link);

    return (
      <div className="uploaded-image">
        <AdvancedImage
          cldImg={image}
          className={`${isSelected && "on-hover"}`}
        />
        <div className="uploaded-image-action-button-container">
          {isSelected ? (
            <Button
              type="button"
              icon="pi pi-check"
              className="p-button-rounded p-button-primary ml-auto action-button selected-button"
              onClick={() => onDelete(link)}
            />
          ) : (
            <>
              {!isPrimary && (
                <>
                  <Tooltip
                    target=".primary-button"
                    content="Set as Primary"
                    position="top"
                    className="uploaded-image-tooltip"
                  />
                  <Button
                    type="button"
                    icon="pi pi-check-circle"
                    className="p-button-rounded p-button-success ml-auto primary-button action-button"
                    onClick={() => onSave(link)}
                  />
                </>
              )}
              <Tooltip
                target=".delete-button"
                content="Delete Image"
                position="top"
                className="uploaded-image-tooltip"
              />
              <Button
                type="button"
                icon="pi pi-trash"
                className="p-button-rounded p-button-danger ml-auto delete-button action-button"
                onClick={() => onDelete(link)}
              />
            </>
          )}
        </div>
      </div>
    );
  });

  ImageTemplate.displayName = "ImageTemplate";

  ImageTemplate.propTypes = {
    image: PropTypes.object.isRequired,
    isPrimary: PropTypes.bool,
    onDelete: PropTypes.func,
    onSave: PropTypes.func,
    link: PropTypes.string,
  };

  const uploadImage = async (e) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      e.files.forEach((file) => {
        formData.append("files", file);
      });
      const jwt = Cookies.get("token");
      const response = await axios.patch(
        `${import.meta.env.VITE_REACT_API_URL}/product/${id}/edit-image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      if (response.status === 200) {
        const sortedImages = response.data.images.sort(
          (a, b) => b.isPrimary - a.isPrimary
        );
        setImages(sortedImages);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteClick = (link) => {
    setSelectedImages((prevSelected) =>
      prevSelected.includes(link)
        ? prevSelected.filter((imageLink) => imageLink !== link)
        : [...prevSelected, link]
    );
  };

  const handleDeleteButtonClick = (e) => {
    e.preventDefault();
    confirmDelete();
  };

  const confirmDelete = () => {
    confirmDialog({
      message: "Are you sure you want to proceed?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      defaultFocus: "accept",
      accept: acceptDelete,
    });
  };

  const confirmSave = (link) => {
    confirmDialog({
      message: "Are you sure you want to proceed?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      defaultFocus: "accept",
      accept: () => acceptSave(link),
    });
  };

  const acceptDelete = async () => {
    setIsSubmitting(true);
    try {
      const jwt = Cookies.get("token");
      const response = await axios.delete(
        `${import.meta.env.VITE_REACT_API_URL}/products/delete-images`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
          data: {
            productId: id,
            imagesLink: selectedImages,
          },
        }
      );
      if (response.status === 200) {
        setImages(
          images.filter(
            (image) =>
              !selectedImages.some(
                (selectedImage) => selectedImage === image.link
              )
          )
        );
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const acceptSave = async (link) => {
    setIsSubmitting(true);
    try {
      const jwt = Cookies.get("token");
      const response = await axios.patch(
        `${import.meta.env.VITE_REACT_API_URL}/products/images/primary`,
        {
          productId: id,
          imageLink: link,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      if (response.status === 200) {
        const updatedImages = images.map((image) => {
          if (image.link === link) {
            return { ...image, isPrimary: true };
          }
          return { ...image, isPrimary: false };
        });

        const sortedImages = updatedImages.sort(
          (a, b) => b.isPrimary - a.isPrimary
        );

        setImages(sortedImages);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const chooseOptions = {
    icon: "pi pi-fw pi-images",
    iconOnly: true,
    className:
      "upload-buttons image-choose-btn p-button-rounded p-button-outlined",
  };
  const uploadOptions = {
    icon: "pi pi-fw pi-cloud-upload",
    iconOnly: true,
    className:
      "upload-buttons image-upload-btn p-button-success p-button-rounded p-button-outlined",
  };
  const cancelOptions = {
    icon: "pi pi-fw pi-times",
    iconOnly: true,
    className:
      "upload-buttons image-cancel-btn p-button-danger p-button-rounded p-button-outlined",
  };

  if (loading) {
    return <EditImageSkeleton />;
  }

  if (isSubmitting) {
    return (
      <ClipLoader
        color="#FEBD69"
        loading={isSubmitting}
        size={70}
        cssOverride={{ display: "block", margin: "300px auto" }}
      />
    );
  }

  return (
    <div className="w-full">
      <Toast ref={toast}></Toast>
      <form className="edit-product-image-form ml-5">
        <h1 className="edit-product-image-title">Upload Product Images</h1>
        <div>
          <Tooltip
            target=".custom-choose-btn"
            content="Choose"
            position="bottom"
          />
          <Tooltip
            target=".custom-upload-btn"
            content="Upload"
            position="bottom"
          />
          <Tooltip
            target=".custom-cancel-btn"
            content="Clear"
            position="bottom"
          />

          <FileUpload
            ref={fileUploadRef}
            name="demo[]"
            multiple
            accept="image/*"
            maxFileSize={1000000}
            onUpload={onTemplateUpload}
            onSelect={onTemplateSelect}
            onError={onTemplateClear}
            onClear={onTemplateClear}
            headerTemplate={headerTemplate}
            itemTemplate={itemTemplate}
            emptyTemplate={emptyTemplate}
            chooseOptions={chooseOptions}
            uploadOptions={uploadOptions}
            cancelOptions={cancelOptions}
            customUpload
            uploadHandler={uploadImage}
          />
          <div className="uploaded-images-container">
            {images.map((image, index) => {
              const cldImage = cld
                .image(image.link)
                .resize(fill().width(100).height(100));
              return (
                <ImageTemplate
                  key={index}
                  image={cldImage}
                  isPrimary={image.isPrimary}
                  onDelete={handleDeleteClick}
                  onSave={confirmSave}
                  link={image.link}
                />
              );
            })}
          </div>
          {selectedImages.length !== 0 && (
            <DeleteButton
              className="add-product-button mt-3"
              disabled={isSubmitting}
              style={{ opacity: isSubmitting ? 0.6 : 1 }}
              onClick={handleDeleteButtonClick}
            >
              {isSubmitting ? "Loading..." : "DELETE IMAGES"}
            </DeleteButton>
          )}
        </div>
      </form>
      <ConfirmDialog draggable={false} />
    </div>
  );
}

export default EditImage;

EditImage.propTypes = {
  formatSize: PropTypes.string,
  onRemove: PropTypes.func,
};
