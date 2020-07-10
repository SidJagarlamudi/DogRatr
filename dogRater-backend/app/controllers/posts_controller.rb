class PostsController < ApplicationController
  def index
    posts = Post.all
    render json: posts
  end

  def create
  
    post = Post.create(img_url: params[:img_url], caption: params[:caption], user_id: User.first.id)

    render json: post
  end

  def update

    post = Post.update(likes: params[:likes])

    render json: post
  end 
end
