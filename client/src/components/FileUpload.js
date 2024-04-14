import { useState } from "react";
import axios from "axios";
import "./FileUpload.css";

const FileUpload = ({ contract, account, provider }) => {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [fileName1, setFileName1] = useState("No File selected");
  const [fileName2, setFileName2] = useState("No File selected");
  const [ImgHash1, setImgHash1] = useState(null);
  const [ImgHash2, setImgHash2] = useState(null);
  const [selectedFileHash, setSelectedFileHash] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (file1 && file2) {
        const formData1 = new FormData();
        formData1.append("file", file1);

        const formData2 = new FormData();
        formData2.append("file", file2);

        const resFile1 = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData1,
          headers: {
            pinata_api_key: `38ace1a461e2120d5cab`,
            pinata_secret_api_key: `050038c7321c5f5753056fa0ab30cdbd7ae01b25376157ca1d8050882d4e7852`,
            "Content-Type": "multipart/form-data",
          },
        });

        const resFile2 = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData2,
          headers: {
            pinata_api_key: `38ace1a461e2120d5cab`,
            pinata_secret_api_key: `050038c7321c5f5753056fa0ab30cdbd7ae01b25376157ca1d8050882d4e7852`,
            "Content-Type": "multipart/form-data",
          },
        });
        const hash1=`https://gateway.pinata.cloud/ipfs/${resFile1.data.IpfsHash}`;
        const hash2=`https://gateway.pinata.cloud/ipfs/${resFile2.data.IpfsHash}`;
        setImgHash1(hash1);
        setImgHash2(hash2);

        contract.add(account, hash1);
        contract.add(account, hash2);

        alert("Successfully Files Uploaded");
        setFileName1("No File selected");
        setFileName2("No File selected");
        setFile1(null);
        setFile2(null);
      } else {
        alert("Please select both files to upload.");
      }
    } catch (e) {
      alert("Unable to upload Files to Pinata");
    }
  };

  const retrieveFile = (e, fileSetter, fileNameSetter) => {
    const data = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      fileSetter(e.target.files[0]);
    };
    fileNameSetter(e.target.files[0].name);
    e.preventDefault();
  };

  const handleViewSelectedFile = () => {
    if (selectedFileHash) {
      window.open(selectedFileHash, '_blank');
    }
  };

  return (
    <div className="top">
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="file-upload1" className="choose">
          Select File 1
        </label>
        <input
          disabled={!account}
          type="file"
          id="file-upload1"
          name="data1"
          onChange={(e) =>
            retrieveFile(e, setFile1, setFileName1)
          } /* Pass file1 setters */
        />
        <span className="textArea">File 1: {fileName1}</span>

        <label htmlFor="file-upload2" className="choose">
          Select File 2
        </label>
        <input
          disabled={!account}
          type="file"
          id="file-upload2"
          name="data2"
          onChange={(e) =>
            retrieveFile(e, setFile2, setFileName2)
          } /* Pass file2 setters */
        />
        <span className="textArea">File 2: {fileName2}</span>

        <button type="submit" className="upload" disabled={!file1 || !file2}>
        Upload Files
      </button>

      <div className="view-dropdown">
          <select
            className="file-dropdown"
            value={selectedFileHash}
            onChange={(e) => setSelectedFileHash(e.target.value)}
            disabled={!ImgHash1 && !ImgHash2}
          >
            <option value="">Select File to View</option>
            {ImgHash1 && <option value={ImgHash1}>File 1</option>}
            {ImgHash2 && <option value={ImgHash2}>File 2</option>}
          </select>
          <button
            type="button"
            className="view"
            onClick={handleViewSelectedFile}
            disabled={!selectedFileHash}
          >
            View Selected File
          </button>
        </div>

      </form>
    </div>
  );
};

export default FileUpload;