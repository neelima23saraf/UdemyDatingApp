using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entity
{
    [Table("Photos")]
    public class Photo
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public bool IsMain { get; set; }
        public string PublicId { get; set; }
        //fully define relationtionship with AppUser
        public AppUser AppUser { get; set; }
        public int AppUserId { get; set; }
    }
}