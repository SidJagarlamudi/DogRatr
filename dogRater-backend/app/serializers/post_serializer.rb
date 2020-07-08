class PostSerializer < ActiveModel::Serializer
  attributes :id, :img_url, :caption, :user, :comments, :likes

  def user
      @object.user.name
  end

end