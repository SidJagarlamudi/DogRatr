class CommentSerializer < ActiveModel::Serializer
  attributes :id, :caption

  belongs_to :post
end