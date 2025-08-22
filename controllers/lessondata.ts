

export async function lessondata(req: Request) {
  const body = await req.json();
  const {shortDescription,level,tags} = body; // understind kaleyaa banaya thaa
  return Response.json({
    message: "Lesson data received",
    body,
  });
};
