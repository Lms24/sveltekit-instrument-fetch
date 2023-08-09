export const GET = ({ params }) => {
	return new Response(`message ${params.id}`);
};
