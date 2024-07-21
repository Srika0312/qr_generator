import { Button } from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { useState } from "react";
import { PiSealWarningBold } from "react-icons/pi";

export const QrCodeGen = () => {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrdata, setQrdata] = useState();
  const [qrsize, setQrsize] = useState();

  // Dynamically Change the Values of the QR Code Image Size and QR Code Value

  async function generateQr() {
    setLoading(true);
    try {
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrsize}x${qrsize}&data=${qrdata}`;
      setImage(url);
    } catch (error) {
      console.log("Error generating QR code", error);
    } finally {
      setLoading(false);
    }
  }

  // Convert the URL to blob format and return the required file format

  function downloadQr() {
    fetch(image)
      .then((response) => response.blob())
      .then((blob) => {
        const link=document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "qr-code.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  }

  return (

    <div className="h-dvh flex flex-col justify-center items-center gap-5">  
      <h1 className="text-center text-3xl pt-10">QR CODE GENERATOR</h1>
      <div className="flex flex-col gap-5 lg:w-1/4 w-5/6">
      <h1 className="text-center text-xl text-slate-500">Generate QR Codes effortlessly !</h1>
        <div className="flex justify-center items-center">
          {loading && <p>Please wait...</p>}
          {image && <Image src={image} />}
        </div>
        <div className="flex flex-col gap-2">
          <label className=" text-sm" htmlFor="">
            Give Data for the QR CODE
          </label>
          <Input
            id="qrDataInput"
            onChange={(e) => setQrdata(e.target.value)}
            value={qrdata}
            color="primary"
            type="text"
            className="text-xl lg:w-full rounded-xl border-blue-300 border-2"
            placeholder="Enter Text or URL for QR code"
          />
          <label className="text-sm" htmlFor="">
            Image size (Eg:100)
          </label>
          <Input
            id="qrSizeInput"
            onChange={(e) => setQrsize(e.target.value)}
            value={qrsize}
            color="primary"
            type="number"
            className="text-xl lg:w-full rounded-xl  border-blue-300 border-2"
            placeholder="Enter Image Size"
          />
        </div>
        <div className="lg:flex lg:flex-row flex flex-col lg:justify-between gap-3 ">
          <Button
            isDisabled={loading || !qrdata || !qrsize}
            color="primary"
            onClick={generateQr}
            className="rounded-xl"
          >
            GENERATE QR CODE
          </Button>
          {image && (
            <Button
            onClick={downloadQr}
            color="primary" className="rounded-xl">
              DOWNLOAD QR CODE
            </Button>
          )}
        </div>
      </div>
      <button onClick={()=>alert("This QR Generator is Under development with new features")}><PiSealWarningBold size={50} color="blue"/></button>
    </div>
  );
};