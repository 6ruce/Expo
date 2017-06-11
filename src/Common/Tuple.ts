export class Tuple2 {
    public static first<T1, T2>(tuple: [T1, T2]): T1 {
        return tuple[0];
    }

    public static second<T1, T2>(tuple: [T1, T2]): T2 {
        return tuple[1];
    }
}
