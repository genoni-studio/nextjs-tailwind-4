export default function Home() {
  return (
    <div className="foo flex list-disc flex-col sm:flex-row">
      <div className="pb-xxx-sm mb-sm flex">
        Photosynthesis is the ultimate source of energy and food for nearly all
        life on earth.
      </div>
      {/* This class will NOT work because the "spacing" theme has been disabled */}
      <div className="pb-28">
        Photosynthesis is the ultimate source of energy and food for nearly all
        life on earth.
      </div>
      <div>
        Photosynthesis is the ultimate source of energy and food for nearly all
        life on earth.
      </div>
      <div>
        Photosynthesis is the ultimate source of energy and food for nearly
        spacing.
      </div>
    </div>
  );
}
