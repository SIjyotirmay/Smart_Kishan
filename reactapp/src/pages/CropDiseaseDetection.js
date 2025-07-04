import UserNavbar from "../inc/UserNavbar";

function CropDiseaseDetection() {
  return (
    <div>
      <UserNavbar />
      <div className="p-6">
        <h2 className="text-2xl font-bold text-red-700">Crop Disease Detection</h2>
        <p className="mt-2 text-gray-800">Upload crop images to detect diseases (Coming Soon).</p>
        {/* You can add image upload & ML integration later here */}
      </div>
    </div>
  );
}

export default CropDiseaseDetection;
