export default function UserProfile({ params }: any) {
  return (
    <div className="">
      <h1>Profile</h1>
      <hr />
      <p>Profile page {params.id}</p>
    </div>
  );
}
