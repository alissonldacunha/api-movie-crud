const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const { page = 1 } = request.query;

    const [count] = await connection('movies').count();

    const movies = await connection('movies')
      .join('users', 'users.id', '=', 'movies.user_id')
      .limit(50)
      .offset((page - 1) * 50)
      .select([
        'movies.*',
        'users.name',
      ]);

    response.header('X-Total-Count', count['count(*)']);

    return response.json(movies);
  },

  async create(request, response) {
    const image = `../../uploads/${request.file.originalname}`;
    const user_id = request.headers.authorization;
    const { title, description, note, categories } = request.body;
    const likes = 0;

    const [id] = await connection('movies').insert({
      title,
      description,
      note,
      image,
      categories,
      likes,
      user_id
    });

    return response.json({ id });

  },

  async delete(request, response) {
    const { id } = request.params;
    const user_id = request.headers.authorization;

    const movie = await connection('movies')
      .where('id', id)
      .select('user_id')
      .first();

    if (movie.user_id !== user_id) {
      return response.status(401).json({ error: 'Operation not permited' });
    }

    await connection('movies').where('id', id).delete();

    return response.status(204).send();
  }
}