export class FileData {
    base64!: string | null;
    fileName!: string | null;
    contentType!: string | null;
}
  
export class ArtImageRef {
    uploadType!: string;
    fileData!: FileData;
    imageLink!: string;
}

export class CreatedArt {
    artName!: string;
    haveSchedule!: boolean;
    startScheduleDate!: string;
    endScheduleDate!: string;
    userAccountType!: string;
    artImageRef!: ArtImageRef[];
}
