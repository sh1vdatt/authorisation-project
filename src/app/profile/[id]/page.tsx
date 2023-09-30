export default function UserProfile({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p className="text-4xl">
        Profile Page
        <span className="p-2 rounded ml-2 text-black bg-gray-600">
          {params.id}
        </span>
      </p>
    </div>
  );
}
