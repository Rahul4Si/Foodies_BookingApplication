import React, { useState, useEffect } from "react";

const QRCode = ({ amount }) => {
  const [qrUrl, setQrUrl] = useState("");

  useEffect(() => {
    const generateQrCode = () => {
      const upiId = "9165201189@ybl"; // Static UPI ID
      const name = "Rahul Kumar Singh"; // Static Name

      let upiLink = `upi://pay?pa=${upiId}&pn=${name}`;
      if (amount) {
        upiLink += `&am=${amount}`;
      }
      upiLink += `&cu=INR`;

      const encodedLink = encodeURIComponent(upiLink);
      const googleQrUrl = `https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=${encodedLink}`;

      setQrUrl(googleQrUrl);
    };

    generateQrCode();
  }, [amount]);

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
          Scan to Pay
        </h2>
        {qrUrl && (
          <div className="mt-6 text-center">
            <img
              src={qrUrl}
              onError={(e) => {
                const upiId = "9165201189@ybl";
                const name = "Rahul Kumar Singh";
                const fallbackUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
                  `upi://pay?pa=${upiId}&pn=${name}${
                    amount ? `&am=${amount}` : ""
                  }&cu=INR`
                )}`;
                e.target.src = fallbackUrl;
              }}
              alt="UPI QR Code"
              className="mx-auto border border-gray-300 rounded-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default QRCode;
